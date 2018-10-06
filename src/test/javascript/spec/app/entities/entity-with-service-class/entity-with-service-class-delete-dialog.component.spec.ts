/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassDeleteDialogComponent } from 'app/entities/entity-with-service-class/entity-with-service-class-delete-dialog.component';
import { EntityWithServiceClassService } from 'app/entities/entity-with-service-class/entity-with-service-class.service';

describe('Component Tests', () => {
    describe('EntityWithServiceClass Management Delete Component', () => {
        let comp: EntityWithServiceClassDeleteDialogComponent;
        let fixture: ComponentFixture<EntityWithServiceClassDeleteDialogComponent>;
        let service: EntityWithServiceClassService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassDeleteDialogComponent]
            })
                .overrideTemplate(EntityWithServiceClassDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceClassDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassService);
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
