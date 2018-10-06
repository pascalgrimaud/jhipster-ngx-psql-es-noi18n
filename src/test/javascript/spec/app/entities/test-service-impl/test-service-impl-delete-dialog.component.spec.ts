/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestServiceImplDeleteDialogComponent } from 'app/entities/test-service-impl/test-service-impl-delete-dialog.component';
import { TestServiceImplService } from 'app/entities/test-service-impl/test-service-impl.service';

describe('Component Tests', () => {
    describe('TestServiceImpl Management Delete Component', () => {
        let comp: TestServiceImplDeleteDialogComponent;
        let fixture: ComponentFixture<TestServiceImplDeleteDialogComponent>;
        let service: TestServiceImplService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestServiceImplDeleteDialogComponent]
            })
                .overrideTemplate(TestServiceImplDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestServiceImplDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestServiceImplService);
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
