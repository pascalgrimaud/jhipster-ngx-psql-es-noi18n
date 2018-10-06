/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestPagerEntityDeleteDialogComponent } from 'app/entities/field-test-pager-entity/field-test-pager-entity-delete-dialog.component';
import { FieldTestPagerEntityService } from 'app/entities/field-test-pager-entity/field-test-pager-entity.service';

describe('Component Tests', () => {
    describe('FieldTestPagerEntity Management Delete Component', () => {
        let comp: FieldTestPagerEntityDeleteDialogComponent;
        let fixture: ComponentFixture<FieldTestPagerEntityDeleteDialogComponent>;
        let service: FieldTestPagerEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestPagerEntityDeleteDialogComponent]
            })
                .overrideTemplate(FieldTestPagerEntityDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestPagerEntityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestPagerEntityService);
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
