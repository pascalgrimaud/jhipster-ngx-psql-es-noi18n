/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestServiceClassUpdateComponent } from 'app/entities/test-service-class/test-service-class-update.component';
import { TestServiceClassService } from 'app/entities/test-service-class/test-service-class.service';
import { TestServiceClass } from 'app/shared/model/test-service-class.model';

describe('Component Tests', () => {
    describe('TestServiceClass Management Update Component', () => {
        let comp: TestServiceClassUpdateComponent;
        let fixture: ComponentFixture<TestServiceClassUpdateComponent>;
        let service: TestServiceClassService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestServiceClassUpdateComponent]
            })
                .overrideTemplate(TestServiceClassUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestServiceClassUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestServiceClassService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestServiceClass(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testServiceClass = entity;
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
                    const entity = new TestServiceClass();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testServiceClass = entity;
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
