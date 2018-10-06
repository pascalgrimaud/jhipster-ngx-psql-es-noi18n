/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplAndPaginationUpdateComponent } from 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination-update.component';
import { EntityWithServiceImplAndPaginationService } from 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination.service';
import { EntityWithServiceImplAndPagination } from 'app/shared/model/entity-with-service-impl-and-pagination.model';

describe('Component Tests', () => {
    describe('EntityWithServiceImplAndPagination Management Update Component', () => {
        let comp: EntityWithServiceImplAndPaginationUpdateComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndPaginationUpdateComponent>;
        let service: EntityWithServiceImplAndPaginationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplAndPaginationUpdateComponent]
            })
                .overrideTemplate(EntityWithServiceImplAndPaginationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceImplAndPaginationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndPaginationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithServiceImplAndPagination(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceImplAndPagination = entity;
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
                    const entity = new EntityWithServiceImplAndPagination();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceImplAndPagination = entity;
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
