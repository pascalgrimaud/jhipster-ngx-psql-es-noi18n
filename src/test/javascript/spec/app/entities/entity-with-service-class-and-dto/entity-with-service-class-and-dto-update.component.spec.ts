/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassAndDTOUpdateComponent } from 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto-update.component';
import { EntityWithServiceClassAndDTOService } from 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto.service';
import { EntityWithServiceClassAndDTO } from 'app/shared/model/entity-with-service-class-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithServiceClassAndDTO Management Update Component', () => {
        let comp: EntityWithServiceClassAndDTOUpdateComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndDTOUpdateComponent>;
        let service: EntityWithServiceClassAndDTOService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassAndDTOUpdateComponent]
            })
                .overrideTemplate(EntityWithServiceClassAndDTOUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceClassAndDTOUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassAndDTOService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithServiceClassAndDTO(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceClassAndDTO = entity;
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
                    const entity = new EntityWithServiceClassAndDTO();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceClassAndDTO = entity;
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
