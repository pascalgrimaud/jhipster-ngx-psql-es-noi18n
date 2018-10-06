/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestEntityUpdateComponent } from 'app/entities/field-test-entity/field-test-entity-update.component';
import { FieldTestEntityService } from 'app/entities/field-test-entity/field-test-entity.service';
import { FieldTestEntity } from 'app/shared/model/field-test-entity.model';

describe('Component Tests', () => {
    describe('FieldTestEntity Management Update Component', () => {
        let comp: FieldTestEntityUpdateComponent;
        let fixture: ComponentFixture<FieldTestEntityUpdateComponent>;
        let service: FieldTestEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestEntityUpdateComponent]
            })
                .overrideTemplate(FieldTestEntityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestEntityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestEntityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FieldTestEntity(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestEntity = entity;
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
                    const entity = new FieldTestEntity();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestEntity = entity;
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
