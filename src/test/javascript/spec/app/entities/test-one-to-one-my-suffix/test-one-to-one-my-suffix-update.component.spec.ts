/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestOneToOneMySuffixUpdateComponent } from 'app/entities/test-one-to-one-my-suffix/test-one-to-one-my-suffix-update.component';
import { TestOneToOneMySuffixService } from 'app/entities/test-one-to-one-my-suffix/test-one-to-one-my-suffix.service';
import { TestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';

describe('Component Tests', () => {
    describe('TestOneToOneMySuffix Management Update Component', () => {
        let comp: TestOneToOneMySuffixUpdateComponent;
        let fixture: ComponentFixture<TestOneToOneMySuffixUpdateComponent>;
        let service: TestOneToOneMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestOneToOneMySuffixUpdateComponent]
            })
                .overrideTemplate(TestOneToOneMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestOneToOneMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestOneToOneMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestOneToOneMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testOneToOne = entity;
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
                    const entity = new TestOneToOneMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testOneToOne = entity;
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
