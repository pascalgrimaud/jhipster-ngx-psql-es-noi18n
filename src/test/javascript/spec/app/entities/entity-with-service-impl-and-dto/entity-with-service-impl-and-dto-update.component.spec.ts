/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplAndDTOUpdateComponent } from 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-update.component';
import { EntityWithServiceImplAndDTOService } from 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.service';
import { EntityWithServiceImplAndDTO } from 'app/shared/model/entity-with-service-impl-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithServiceImplAndDTO Management Update Component', () => {
        let comp: EntityWithServiceImplAndDTOUpdateComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndDTOUpdateComponent>;
        let service: EntityWithServiceImplAndDTOService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplAndDTOUpdateComponent]
            })
                .overrideTemplate(EntityWithServiceImplAndDTOUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceImplAndDTOUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndDTOService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithServiceImplAndDTO(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceImplAndDTO = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithServiceImplAndDTO();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceImplAndDTO = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
