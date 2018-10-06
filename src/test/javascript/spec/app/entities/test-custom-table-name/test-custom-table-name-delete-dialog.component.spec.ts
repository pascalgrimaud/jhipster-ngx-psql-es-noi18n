/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestCustomTableNameDeleteDialogComponent } from 'app/entities/test-custom-table-name/test-custom-table-name-delete-dialog.component';
import { TestCustomTableNameService } from 'app/entities/test-custom-table-name/test-custom-table-name.service';

describe('Component Tests', () => {
    describe('TestCustomTableName Management Delete Component', () => {
        let comp: TestCustomTableNameDeleteDialogComponent;
        let fixture: ComponentFixture<TestCustomTableNameDeleteDialogComponent>;
        let service: TestCustomTableNameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestCustomTableNameDeleteDialogComponent]
            })
                .overrideTemplate(TestCustomTableNameDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestCustomTableNameDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestCustomTableNameService);
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
