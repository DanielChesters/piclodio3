/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PlayerService]
        });
    });

    it('should ...', inject([PlayerService], (service: PlayerService) => {
        expect(service).toBeTruthy();
    }));
});
