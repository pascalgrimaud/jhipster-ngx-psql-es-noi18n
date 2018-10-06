/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassAndPaginationUpdateComponent } from 'app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination-update.component';
import { EntityWithServiceClassAndPaginationService } from 'app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.service';
import { EntityWithServiceClassAndPagination } from 'app/shared/model/entity-with-service-class-and-pagination.model';

describe('Component Tests', () => {
    describe('EntityWithServiceClassAndPagination Management Update Component', () => {
        let comp: EntityWithServiceClassAndPaginationUpdateComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndPaginationUpdateComponent>;
        let service: EntityWithServiceClassAndPaginationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassAndPaginationUpdateComponent]
            })
                .overrideTemplate(EntityWithServiceClassAndPaginationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceClassAndPaginationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassAndPaginationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithServiceClassAndPagination(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceClassAndPagination = entity;
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
                    const entity = new EntityWithServiceClassAndPagination();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceClassAndPagination = entity;
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
