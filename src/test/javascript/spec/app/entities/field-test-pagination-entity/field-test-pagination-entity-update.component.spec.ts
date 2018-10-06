/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestPaginationEntityUpdateComponent } from 'app/entities/field-test-pagination-entity/field-test-pagination-entity-update.component';
import { FieldTestPaginationEntityService } from 'app/entities/field-test-pagination-entity/field-test-pagination-entity.service';
import { FieldTestPaginationEntity } from 'app/shared/model/field-test-pagination-entity.model';

describe('Component Tests', () => {
    describe('FieldTestPaginationEntity Management Update Component', () => {
        let comp: FieldTestPaginationEntityUpdateComponent;
        let fixture: ComponentFixture<FieldTestPaginationEntityUpdateComponent>;
        let service: FieldTestPaginationEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestPaginationEntityUpdateComponent]
            })
                .overrideTemplate(FieldTestPaginationEntityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestPaginationEntityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestPaginationEntityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FieldTestPaginationEntity(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestPaginationEntity = entity;
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
                    const entity = new FieldTestPaginationEntity();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestPaginationEntity = entity;
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
