/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestPagerDeleteDialogComponent } from 'app/entities/test-pager/test-pager-delete-dialog.component';
import { TestPagerService } from 'app/entities/test-pager/test-pager.service';

describe('Component Tests', () => {
    describe('TestPager Management Delete Component', () => {
        let comp: TestPagerDeleteDialogComponent;
        let fixture: ComponentFixture<TestPagerDeleteDialogComponent>;
        let service: TestPagerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestPagerDeleteDialogComponent]
            })
                .overrideTemplate(TestPagerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestPagerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestPagerService);
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
