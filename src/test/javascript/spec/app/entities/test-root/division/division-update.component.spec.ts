/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../../test.module';
import { DivisionUpdateComponent } from 'app/entities/test-root/division/division-update.component';
import { DivisionService } from 'app/entities/test-root/division/division.service';
import { Division } from 'app/shared/model/test-root/division.model';

describe('Component Tests', () => {
    describe('Division Management Update Component', () => {
        let comp: DivisionUpdateComponent;
        let fixture: ComponentFixture<DivisionUpdateComponent>;
        let service: DivisionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [DivisionUpdateComponent]
            })
                .overrideTemplate(DivisionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DivisionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DivisionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Division(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.division = entity;
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
                    const entity = new Division();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.division = entity;
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
