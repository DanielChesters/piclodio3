import threading
import os
from os import path
import signal
import gi
gi.require_version("Gst", "1.0")
from time import sleep
from gi.repository import Gst, GObject
Gst.init(None)

class PlayerManager(object):
    """
    Class to play music with GStreamer
    """
    PLAYER = Gst.ElementFactory.make("playbin", "player")
    MAIN_LOOP = GObject.MainLoop()
    PATH_PID = path.join('/tmp', 'piclodio.pid')

    @classmethod
    def play(cls, url, blocking_thread=False):
        # stop playing if already running
        if cls.is_started():
            cls.stop()
        cls.try_to_kill_external_player()
        cls.PLAYER.set_property("uri", url)
        cls.PLAYER.set_state(Gst.State.PLAYING)
        if blocking_thread :
            cls.MAIN_LOOP.run()

    @classmethod
    def stop(cls):
        """
        Stop playing
        """
        cls.try_to_kill_external_player()
        cls.PLAYER.set_state(Gst.State.NULL)
        if cls.MAIN_LOOP.is_running :
            cls.MAIN_LOOP.quit()

    @classmethod
    def is_started(cls):
        state = cls.PLAYER.get_state(Gst.CLOCK_TIME_NONE)
        return state.state == Gst.State.PLAYING

    @classmethod
    def try_to_kill_external_player(cls):
        if path.exists(cls.PATH_PID):
            pid_file = open(cls.PATH_PID, 'r')
            pid = int(pid_file.read())
            pid_file.close()
            if pid != os.getpid():
                os.kill(pid, signal.SIGTERM)
                os.remove(cls.PATH_PID)


class ThreadTimeout(object):
    def __init__(self, callback_instance, backup_instance, timeout, time_before_auto_kill=None):
        self.callback_instance = callback_instance
        self.backup_instance = backup_instance
        self.timeout = timeout
        self.main_thread = None
        if time_before_auto_kill is not None:
            self.time_before_auto_kill = int(time_before_auto_kill)
        else:
            self.time_before_auto_kill = None

        # save current PID in file
        file_pid = open(PlayerManager.PATH_PID, 'w')
        file_pid.write(str(os.getpid()))
        file_pid.close()

    def run(self):
        def play_webradio_thread():
            print('Starting the web radio player thread')
            self.callback_instance.start()

        def check_webradio_is_running_thread():
            print("Wait %s seconds before checking if the thread is alive" % self.timeout)
            sleep(self.timeout)
            if self.main_thread.is_alive():
                print('Thread is alive')
            else:
                print('Thread is dead')
                if self.backup_instance is not None:
                    print("Playing backup file")
                    self.backup_instance.start()
                else:
                    print("Not backup file provided")

        def auto_kill_thread():
            print("Auto kill thread started, will stop the web radio in %s minutes" % self.time_before_auto_kill)
            sleep(self.time_before_auto_kill*60)
            if path.exists(PlayerManager.PATH_PID):
                os.remove(PlayerManager.PATH_PID)
            PlayerManager.stop()

        # start a thread to play the web radio
        self.main_thread = threading.Thread(target=play_webradio_thread)
        self.main_thread.start()

        # start a thread that will check that the first thread is alive
        thread_waiting = threading.Thread(target=check_webradio_is_running_thread)
        thread_waiting.start()

        # start a thread for auto kill
        if self.time_before_auto_kill is not None:
            thread_auto_kill = threading.Thread(target=auto_kill_thread)
            thread_auto_kill.start()


class CallbackPlayer(object):
    def __init__(self, url=None):
        self.url = url

    def start(self):
        PlayerManager.play(self.url, blocking_thread=True)
