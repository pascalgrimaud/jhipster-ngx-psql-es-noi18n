/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestInfiniteScrollEntityDeleteDialogComponent } from 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity-delete-dialog.component';
import { FieldTestInfiniteScrollEntityService } from 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.service';

describe('Component Tests', () => {
    describe('FieldTestInfiniteScrollEntity Management Delete Component', () => {
        let comp: FieldTestInfiniteScrollEntityDeleteDialogComponent;
        let fixture: ComponentFixture<FieldTestInfiniteScrollEntityDeleteDialogComponent>;
        let service: FieldTestInfiniteScrollEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestInfiniteScrollEntityDeleteDialogComponent]
            })
                .overrideTemplate(FieldTestInfiniteScrollEntityDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestInfiniteScrollEntityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestInfiniteScrollEntityService);
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
