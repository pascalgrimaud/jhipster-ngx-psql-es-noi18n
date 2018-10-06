/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithPaginationDeleteDialogComponent } from 'app/entities/entity-with-pagination/entity-with-pagination-delete-dialog.component';
import { EntityWithPaginationService } from 'app/entities/entity-with-pagination/entity-with-pagination.service';

describe('Component Tests', () => {
    describe('EntityWithPagination Management Delete Component', () => {
        let comp: EntityWithPaginationDeleteDialogComponent;
        let fixture: ComponentFixture<EntityWithPaginationDeleteDialogComponent>;
        let service: EntityWithPaginationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithPaginationDeleteDialogComponent]
            })
                .overrideTemplate(EntityWithPaginationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithPaginationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationService);
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
