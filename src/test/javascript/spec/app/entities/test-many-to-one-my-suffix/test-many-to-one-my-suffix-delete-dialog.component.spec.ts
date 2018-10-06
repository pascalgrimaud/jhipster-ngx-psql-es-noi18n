/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyToOneMySuffixDeleteDialogComponent } from 'app/entities/test-many-to-one-my-suffix/test-many-to-one-my-suffix-delete-dialog.component';
import { TestManyToOneMySuffixService } from 'app/entities/test-many-to-one-my-suffix/test-many-to-one-my-suffix.service';

describe('Component Tests', () => {
    describe('TestManyToOneMySuffix Management Delete Component', () => {
        let comp: TestManyToOneMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TestManyToOneMySuffixDeleteDialogComponent>;
        let service: TestManyToOneMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyToOneMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(TestManyToOneMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestManyToOneMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestManyToOneMySuffixService);
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
