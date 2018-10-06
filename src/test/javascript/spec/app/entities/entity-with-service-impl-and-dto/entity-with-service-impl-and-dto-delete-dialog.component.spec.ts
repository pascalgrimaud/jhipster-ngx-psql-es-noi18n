/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplAndDTODeleteDialogComponent } from 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-delete-dialog.component';
import { EntityWithServiceImplAndDTOService } from 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.service';

describe('Component Tests', () => {
    describe('EntityWithServiceImplAndDTO Management Delete Component', () => {
        let comp: EntityWithServiceImplAndDTODeleteDialogComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndDTODeleteDialogComponent>;
        let service: EntityWithServiceImplAndDTOService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplAndDTODeleteDialogComponent]
            })
                .overrideTemplate(EntityWithServiceImplAndDTODeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceImplAndDTODeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndDTOService);
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
