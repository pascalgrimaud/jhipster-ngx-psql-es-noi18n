/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestMapstructDeleteDialogComponent } from 'app/entities/test-mapstruct/test-mapstruct-delete-dialog.component';
import { TestMapstructService } from 'app/entities/test-mapstruct/test-mapstruct.service';

describe('Component Tests', () => {
    describe('TestMapstruct Management Delete Component', () => {
        let comp: TestMapstructDeleteDialogComponent;
        let fixture: ComponentFixture<TestMapstructDeleteDialogComponent>;
        let service: TestMapstructService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestMapstructDeleteDialogComponent]
            })
                .overrideTemplate(TestMapstructDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestMapstructDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestMapstructService);
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
