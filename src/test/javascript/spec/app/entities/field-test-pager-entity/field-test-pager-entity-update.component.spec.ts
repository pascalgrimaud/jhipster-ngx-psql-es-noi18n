/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestPagerEntityUpdateComponent } from 'app/entities/field-test-pager-entity/field-test-pager-entity-update.component';
import { FieldTestPagerEntityService } from 'app/entities/field-test-pager-entity/field-test-pager-entity.service';
import { FieldTestPagerEntity } from 'app/shared/model/field-test-pager-entity.model';

describe('Component Tests', () => {
    describe('FieldTestPagerEntity Management Update Component', () => {
        let comp: FieldTestPagerEntityUpdateComponent;
        let fixture: ComponentFixture<FieldTestPagerEntityUpdateComponent>;
        let service: FieldTestPagerEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestPagerEntityUpdateComponent]
            })
                .overrideTemplate(FieldTestPagerEntityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestPagerEntityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestPagerEntityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FieldTestPagerEntity(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestPagerEntity = entity;
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
                    const entity = new FieldTestPagerEntity();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestPagerEntity = entity;
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
