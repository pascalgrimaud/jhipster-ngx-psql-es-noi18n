/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestInfiniteScrollEntityUpdateComponent } from 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity-update.component';
import { FieldTestInfiniteScrollEntityService } from 'app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.service';
import { FieldTestInfiniteScrollEntity } from 'app/shared/model/field-test-infinite-scroll-entity.model';

describe('Component Tests', () => {
    describe('FieldTestInfiniteScrollEntity Management Update Component', () => {
        let comp: FieldTestInfiniteScrollEntityUpdateComponent;
        let fixture: ComponentFixture<FieldTestInfiniteScrollEntityUpdateComponent>;
        let service: FieldTestInfiniteScrollEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestInfiniteScrollEntityUpdateComponent]
            })
                .overrideTemplate(FieldTestInfiniteScrollEntityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestInfiniteScrollEntityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestInfiniteScrollEntityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FieldTestInfiniteScrollEntity(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestInfiniteScrollEntity = entity;
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
                    const entity = new FieldTestInfiniteScrollEntity();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestInfiniteScrollEntity = entity;
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
