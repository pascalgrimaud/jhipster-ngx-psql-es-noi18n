/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestServiceClassEntityDeleteDialogComponent } from 'app/entities/field-test-service-class-entity/field-test-service-class-entity-delete-dialog.component';
import { FieldTestServiceClassEntityService } from 'app/entities/field-test-service-class-entity/field-test-service-class-entity.service';

describe('Component Tests', () => {
    describe('FieldTestServiceClassEntity Management Delete Component', () => {
        let comp: FieldTestServiceClassEntityDeleteDialogComponent;
        let fixture: ComponentFixture<FieldTestServiceClassEntityDeleteDialogComponent>;
        let service: FieldTestServiceClassEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestServiceClassEntityDeleteDialogComponent]
            })
                .overrideTemplate(FieldTestServiceClassEntityDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestServiceClassEntityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceClassEntityService);
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
