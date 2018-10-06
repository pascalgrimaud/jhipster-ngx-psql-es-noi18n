/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassUpdateComponent } from 'app/entities/entity-with-service-class/entity-with-service-class-update.component';
import { EntityWithServiceClassService } from 'app/entities/entity-with-service-class/entity-with-service-class.service';
import { EntityWithServiceClass } from 'app/shared/model/entity-with-service-class.model';

describe('Component Tests', () => {
    describe('EntityWithServiceClass Management Update Component', () => {
        let comp: EntityWithServiceClassUpdateComponent;
        let fixture: ComponentFixture<EntityWithServiceClassUpdateComponent>;
        let service: EntityWithServiceClassService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassUpdateComponent]
            })
                .overrideTemplate(EntityWithServiceClassUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceClassUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithServiceClass(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceClass = entity;
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
                    const entity = new EntityWithServiceClass();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceClass = entity;
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
