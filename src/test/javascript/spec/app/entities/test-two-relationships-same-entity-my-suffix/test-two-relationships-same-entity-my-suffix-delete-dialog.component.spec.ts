/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent } from 'app/entities/test-two-relationships-same-entity-my-suffix/test-two-relationships-same-entity-my-suffix-delete-dialog.component';
import { TestTwoRelationshipsSameEntityMySuffixService } from 'app/entities/test-two-relationships-same-entity-my-suffix/test-two-relationships-same-entity-my-suffix.service';

describe('Component Tests', () => {
    describe('TestTwoRelationshipsSameEntityMySuffix Management Delete Component', () => {
        let comp: TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent>;
        let service: TestTwoRelationshipsSameEntityMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestTwoRelationshipsSameEntityMySuffixService);
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
