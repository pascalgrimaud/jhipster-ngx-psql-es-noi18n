/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyToManyMySuffixDeleteDialogComponent } from 'app/entities/test-many-to-many-my-suffix/test-many-to-many-my-suffix-delete-dialog.component';
import { TestManyToManyMySuffixService } from 'app/entities/test-many-to-many-my-suffix/test-many-to-many-my-suffix.service';

describe('Component Tests', () => {
    describe('TestManyToManyMySuffix Management Delete Component', () => {
        let comp: TestManyToManyMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TestManyToManyMySuffixDeleteDialogComponent>;
        let service: TestManyToManyMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyToManyMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(TestManyToManyMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestManyToManyMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestManyToManyMySuffixService);
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
