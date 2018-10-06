/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyRelPaginDTOMySuffixDeleteDialogComponent } from 'app/entities/test-many-rel-pagin-dto-my-suffix/test-many-rel-pagin-dto-my-suffix-delete-dialog.component';
import { TestManyRelPaginDTOMySuffixService } from 'app/entities/test-many-rel-pagin-dto-my-suffix/test-many-rel-pagin-dto-my-suffix.service';

describe('Component Tests', () => {
    describe('TestManyRelPaginDTOMySuffix Management Delete Component', () => {
        let comp: TestManyRelPaginDTOMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TestManyRelPaginDTOMySuffixDeleteDialogComponent>;
        let service: TestManyRelPaginDTOMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyRelPaginDTOMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(TestManyRelPaginDTOMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestManyRelPaginDTOMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestManyRelPaginDTOMySuffixService);
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
