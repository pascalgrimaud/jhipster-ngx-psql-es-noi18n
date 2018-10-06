/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestServiceClassEntityUpdateComponent } from 'app/entities/field-test-service-class-entity/field-test-service-class-entity-update.component';
import { FieldTestServiceClassEntityService } from 'app/entities/field-test-service-class-entity/field-test-service-class-entity.service';
import { FieldTestServiceClassEntity } from 'app/shared/model/field-test-service-class-entity.model';

describe('Component Tests', () => {
    describe('FieldTestServiceClassEntity Management Update Component', () => {
        let comp: FieldTestServiceClassEntityUpdateComponent;
        let fixture: ComponentFixture<FieldTestServiceClassEntityUpdateComponent>;
        let service: FieldTestServiceClassEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestServiceClassEntityUpdateComponent]
            })
                .overrideTemplate(FieldTestServiceClassEntityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldTestServiceClassEntityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceClassEntityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FieldTestServiceClassEntity(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestServiceClassEntity = entity;
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
                    const entity = new FieldTestServiceClassEntity();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldTestServiceClassEntity = entity;
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
