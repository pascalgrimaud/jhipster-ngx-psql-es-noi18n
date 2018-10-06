/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestEntityDeleteDialogComponent } from 'app/entities/field-test-entity/field-test-entity-delete-dialog.component';
import { FieldTestEntityService } from 'app/entities/field-test-entity/field-test-entity.service';

describe('Component Tests', () => {
    describe('FieldTestEntity Management Delete Component', () => {
        let comp: FieldTestEntityDeleteDialogComponent;
        let fixture: ComponentFixture<FieldTestEntityDeleteDialogComponent>;
        let service: FieldTestEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestEntityDeleteDialogComponent]
            })
                .overrideTemplate(FieldTestEntityDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestEntityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestEntityService);
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
