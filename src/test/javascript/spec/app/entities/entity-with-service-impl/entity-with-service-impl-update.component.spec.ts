/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplUpdateComponent } from 'app/entities/entity-with-service-impl/entity-with-service-impl-update.component';
import { EntityWithServiceImplService } from 'app/entities/entity-with-service-impl/entity-with-service-impl.service';
import { EntityWithServiceImpl } from 'app/shared/model/entity-with-service-impl.model';

describe('Component Tests', () => {
    describe('EntityWithServiceImpl Management Update Component', () => {
        let comp: EntityWithServiceImplUpdateComponent;
        let fixture: ComponentFixture<EntityWithServiceImplUpdateComponent>;
        let service: EntityWithServiceImplService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplUpdateComponent]
            })
                .overrideTemplate(EntityWithServiceImplUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithServiceImplUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithServiceImpl(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceImpl = entity;
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
                    const entity = new EntityWithServiceImpl();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithServiceImpl = entity;
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
