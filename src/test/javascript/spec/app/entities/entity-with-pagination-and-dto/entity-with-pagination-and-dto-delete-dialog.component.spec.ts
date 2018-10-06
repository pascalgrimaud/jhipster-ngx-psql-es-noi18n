/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithPaginationAndDTODeleteDialogComponent } from 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto-delete-dialog.component';
import { EntityWithPaginationAndDTOService } from 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto.service';

describe('Component Tests', () => {
    describe('EntityWithPaginationAndDTO Management Delete Component', () => {
        let comp: EntityWithPaginationAndDTODeleteDialogComponent;
        let fixture: ComponentFixture<EntityWithPaginationAndDTODeleteDialogComponent>;
        let service: EntityWithPaginationAndDTOService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithPaginationAndDTODeleteDialogComponent]
            })
                .overrideTemplate(EntityWithPaginationAndDTODeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithPaginationAndDTODeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationAndDTOService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
