/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassPaginationAndDTOUpdateComponent } from 'app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto-update.component';
import { EntityWithServiceClassPaginationAndDTOService } from 'app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.service';
import { EntityWithServiceClassPaginationAndDTO } from 'app/shared/model/entity-with-service-class-pagination-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithServiceClassPaginationAndDTO Management Update Component', () => {
        let comp: EntityWithServiceClassPaginationAndDTOUpdateComponent;
        let fixture: ComponentFixture<EntityWithServiceClassPaginationAndDTOUpdateComponent>;
        let service: EntityWithServiceClassPaginationAndDTOService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassPaginationAndDTOUpdateComponent]
            })
                .overrideTemplate(EntityWithServiceClassPaginationAndDTOUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceClassPaginationAndDTOUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassPaginationAndDTOService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithServiceClassPaginationAndDTO(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceClassPaginationAndDTO = entity;
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
                    const entity = new EntityWithServiceClassPaginationAndDTO();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceClassPaginationAndDTO = entity;
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
