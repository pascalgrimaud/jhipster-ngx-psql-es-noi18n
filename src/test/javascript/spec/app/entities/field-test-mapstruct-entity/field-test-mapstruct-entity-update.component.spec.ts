/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestMapstructEntityUpdateComponent } from 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity-update.component';
import { FieldTestMapstructEntityService } from 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.service';
import { FieldTestMapstructEntity } from 'app/shared/model/field-test-mapstruct-entity.model';

describe('Component Tests', () => {
    describe('FieldTestMapstructEntity Management Update Component', () => {
        let comp: FieldTestMapstructEntityUpdateComponent;
        let fixture: ComponentFixture<FieldTestMapstructEntityUpdateComponent>;
        let service: FieldTestMapstructEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestMapstructEntityUpdateComponent]
            })
                .overrideTemplate(FieldTestMapstructEntityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestMapstructEntityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestMapstructEntityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FieldTestMapstructEntity(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestMapstructEntity = entity;
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
                    const entity = new FieldTestMapstructEntity();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestMapstructEntity = entity;
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
