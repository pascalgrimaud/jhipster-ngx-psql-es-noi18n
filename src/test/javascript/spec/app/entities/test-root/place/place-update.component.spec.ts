/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../../test.module';
import { PlaceUpdateComponent } from 'app/entities/test-root/place/place-update.component';
import { PlaceService } from 'app/entities/test-root/place/place.service';
import { Place } from 'app/shared/model/test-root/place.model';

describe('Component Tests', () => {
    describe('Place Management Update Component', () => {
        let comp: PlaceUpdateComponent;
        let fixture: ComponentFixture<PlaceUpdateComponent>;
        let service: PlaceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [PlaceUpdateComponent]
            })
                .overrideTemplate(PlaceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlaceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Place(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.place = entity;
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
                    const entity = new Place();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.place = entity;
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
