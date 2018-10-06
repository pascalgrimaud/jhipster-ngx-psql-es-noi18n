/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplPaginationAndDTOUpdateComponent } from 'app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto-update.component';
import { EntityWithServiceImplPaginationAndDTOService } from 'app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.service';
import { EntityWithServiceImplPaginationAndDTO } from 'app/shared/model/entity-with-service-impl-pagination-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithServiceImplPaginationAndDTO Management Update Component', () => {
        let comp: EntityWithServiceImplPaginationAndDTOUpdateComponent;
        let fixture: ComponentFixture<EntityWithServiceImplPaginationAndDTOUpdateComponent>;
        let service: EntityWithServiceImplPaginationAndDTOService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplPaginationAndDTOUpdateComponent]
            })
                .overrideTemplate(EntityWithServiceImplPaginationAndDTOUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceImplPaginationAndDTOUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplPaginationAndDTOService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithServiceImplPaginationAndDTO(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceImplPaginationAndDTO = entity;
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
                    const entity = new EntityWithServiceImplPaginationAndDTO();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceImplPaginationAndDTO = entity;
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
