/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../../test.module';
import { DivisionDeleteDialogComponent } from 'app/entities/test-root/division/division-delete-dialog.component';
import { DivisionService } from 'app/entities/test-root/division/division.service';

describe('Component Tests', () => {
    describe('Division Management Delete Component', () => {
        let comp: DivisionDeleteDialogComponent;
        let fixture: ComponentFixture<DivisionDeleteDialogComponent>;
        let service: DivisionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [DivisionDeleteDialogComponent]
            })
                .overrideTemplate(DivisionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DivisionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DivisionService);
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
