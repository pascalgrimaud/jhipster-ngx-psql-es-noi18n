/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplAndPaginationDeleteDialogComponent } from 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination-delete-dialog.component';
import { EntityWithServiceImplAndPaginationService } from 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination.service';

describe('Component Tests', () => {
    describe('EntityWithServiceImplAndPagination Management Delete Component', () => {
        let comp: EntityWithServiceImplAndPaginationDeleteDialogComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndPaginationDeleteDialogComponent>;
        let service: EntityWithServiceImplAndPaginationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplAndPaginationDeleteDialogComponent]
            })
                .overrideTemplate(EntityWithServiceImplAndPaginationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceImplAndPaginationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndPaginationService);
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
