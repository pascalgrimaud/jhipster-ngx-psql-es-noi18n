/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithDTOUpdateComponent } from 'app/entities/entity-with-dto/entity-with-dto-update.component';
import { EntityWithDTOService } from 'app/entities/entity-with-dto/entity-with-dto.service';
import { EntityWithDTO } from 'app/shared/model/entity-with-dto.model';

describe('Component Tests', () => {
    describe('EntityWithDTO Management Update Component', () => {
        let comp: EntityWithDTOUpdateComponent;
        let fixture: ComponentFixture<EntityWithDTOUpdateComponent>;
        let service: EntityWithDTOService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithDTOUpdateComponent]
            })
                .overrideTemplate(EntityWithDTOUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntityWithDTOUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithDTOService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntityWithDTO(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithDTO = entity;
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
                    const entity = new EntityWithDTO();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entityWithDTO = entity;
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
