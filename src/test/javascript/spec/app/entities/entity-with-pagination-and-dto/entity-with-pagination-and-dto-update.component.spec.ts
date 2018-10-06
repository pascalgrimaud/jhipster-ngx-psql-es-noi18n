/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithPaginationAndDTOUpdateComponent } from 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto-update.component';
import { EntityWithPaginationAndDTOService } from 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto.service';
import { EntityWithPaginationAndDTO } from 'app/shared/model/entity-with-pagination-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithPaginationAndDTO Management Update Component', () => {
        let comp: EntityWithPaginationAndDTOUpdateComponent;
        let fixture: ComponentFixture<EntityWithPaginationAndDTOUpdateComponent>;
        let service: EntityWithPaginationAndDTOService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithPaginationAndDTOUpdateComponent]
            })
                .overrideTemplate(EntityWithPaginationAndDTOUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithPaginationAndDTOUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationAndDTOService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithPaginationAndDTO(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithPaginationAndDTO = entity;
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
                    const entity = new EntityWithPaginationAndDTO();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithPaginationAndDTO = entity;
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
