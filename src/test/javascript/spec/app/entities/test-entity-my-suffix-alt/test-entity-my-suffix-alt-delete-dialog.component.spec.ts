/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestEntityMySuffixAltDeleteDialogComponent } from 'app/entities/test-entity-my-suffix-alt/test-entity-my-suffix-alt-delete-dialog.component';
import { TestEntityMySuffixAltService } from 'app/entities/test-entity-my-suffix-alt/test-entity-my-suffix-alt.service';

describe('Component Tests', () => {
    describe('TestEntityMySuffixAlt Management Delete Component', () => {
        let comp: TestEntityMySuffixAltDeleteDialogComponent;
        let fixture: ComponentFixture<TestEntityMySuffixAltDeleteDialogComponent>;
        let service: TestEntityMySuffixAltService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestEntityMySuffixAltDeleteDialogComponent]
            })
                .overrideTemplate(TestEntityMySuffixAltDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestEntityMySuffixAltDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestEntityMySuffixAltService);
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
