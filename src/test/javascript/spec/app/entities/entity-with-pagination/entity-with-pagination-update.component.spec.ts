/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithPaginationUpdateComponent } from 'app/entities/entity-with-pagination/entity-with-pagination-update.component';
import { EntityWithPaginationService } from 'app/entities/entity-with-pagination/entity-with-pagination.service';
import { EntityWithPagination } from 'app/shared/model/entity-with-pagination.model';

describe('Component Tests', () => {
    describe('EntityWithPagination Management Update Component', () => {
        let comp: EntityWithPaginationUpdateComponent;
        let fixture: ComponentFixture<EntityWithPaginationUpdateComponent>;
        let service: EntityWithPaginationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithPaginationUpdateComponent]
            })
                .overrideTemplate(EntityWithPaginationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithPaginationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithPagination(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithPagination = entity;
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
                    const entity = new EntityWithPagination();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithPagination = entity;
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
