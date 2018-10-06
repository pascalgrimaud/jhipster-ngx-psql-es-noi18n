/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestPaginationEntityDeleteDialogComponent } from 'app/entities/field-test-pagination-entity/field-test-pagination-entity-delete-dialog.component';
import { FieldTestPaginationEntityService } from 'app/entities/field-test-pagination-entity/field-test-pagination-entity.service';

describe('Component Tests', () => {
    describe('FieldTestPaginationEntity Management Delete Component', () => {
        let comp: FieldTestPaginationEntityDeleteDialogComponent;
        let fixture: ComponentFixture<FieldTestPaginationEntityDeleteDialogComponent>;
        let service: FieldTestPaginationEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestPaginationEntityDeleteDialogComponent]
            })
                .overrideTemplate(FieldTestPaginationEntityDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestPaginationEntityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestPaginationEntityService);
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
