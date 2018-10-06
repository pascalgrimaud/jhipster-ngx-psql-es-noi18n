/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestServiceClassDeleteDialogComponent } from 'app/entities/test-service-class/test-service-class-delete-dialog.component';
import { TestServiceClassService } from 'app/entities/test-service-class/test-service-class.service';

describe('Component Tests', () => {
    describe('TestServiceClass Management Delete Component', () => {
        let comp: TestServiceClassDeleteDialogComponent;
        let fixture: ComponentFixture<TestServiceClassDeleteDialogComponent>;
        let service: TestServiceClassService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestServiceClassDeleteDialogComponent]
            })
                .overrideTemplate(TestServiceClassDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestServiceClassDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestServiceClassService);
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
