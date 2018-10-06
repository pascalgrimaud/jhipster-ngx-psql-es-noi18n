/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyToOneMySuffixUpdateComponent } from 'app/entities/test-many-to-one-my-suffix/test-many-to-one-my-suffix-update.component';
import { TestManyToOneMySuffixService } from 'app/entities/test-many-to-one-my-suffix/test-many-to-one-my-suffix.service';
import { TestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';

describe('Component Tests', () => {
    describe('TestManyToOneMySuffix Management Update Component', () => {
        let comp: TestManyToOneMySuffixUpdateComponent;
        let fixture: ComponentFixture<TestManyToOneMySuffixUpdateComponent>;
        let service: TestManyToOneMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyToOneMySuffixUpdateComponent]
            })
                .overrideTemplate(TestManyToOneMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestManyToOneMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestManyToOneMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestManyToOneMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testManyToOne = entity;
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
                    const entity = new TestManyToOneMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testManyToOne = entity;
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
