/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestMapstructUpdateComponent } from 'app/entities/test-mapstruct/test-mapstruct-update.component';
import { TestMapstructService } from 'app/entities/test-mapstruct/test-mapstruct.service';
import { TestMapstruct } from 'app/shared/model/test-mapstruct.model';

describe('Component Tests', () => {
    describe('TestMapstruct Management Update Component', () => {
        let comp: TestMapstructUpdateComponent;
        let fixture: ComponentFixture<TestMapstructUpdateComponent>;
        let service: TestMapstructService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestMapstructUpdateComponent]
            })
                .overrideTemplate(TestMapstructUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestMapstructUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestMapstructService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestMapstruct(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testMapstruct = entity;
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
                    const entity = new TestMapstruct();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testMapstruct = entity;
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
