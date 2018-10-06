/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestServiceImplEntityUpdateComponent } from 'app/entities/field-test-service-impl-entity/field-test-service-impl-entity-update.component';
import { FieldTestServiceImplEntityService } from 'app/entities/field-test-service-impl-entity/field-test-service-impl-entity.service';
import { FieldTestServiceImplEntity } from 'app/shared/model/field-test-service-impl-entity.model';

describe('Component Tests', () => {
    describe('FieldTestServiceImplEntity Management Update Component', () => {
        let comp: FieldTestServiceImplEntityUpdateComponent;
        let fixture: ComponentFixture<FieldTestServiceImplEntityUpdateComponent>;
        let service: FieldTestServiceImplEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestServiceImplEntityUpdateComponent]
            })
                .overrideTemplate(FieldTestServiceImplEntityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestServiceImplEntityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceImplEntityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FieldTestServiceImplEntity(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestServiceImplEntity = entity;
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
                    const entity = new FieldTestServiceImplEntity();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestServiceImplEntity = entity;
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
