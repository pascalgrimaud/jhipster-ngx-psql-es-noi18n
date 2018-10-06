/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestPagerUpdateComponent } from 'app/entities/test-pager/test-pager-update.component';
import { TestPagerService } from 'app/entities/test-pager/test-pager.service';
import { TestPager } from 'app/shared/model/test-pager.model';

describe('Component Tests', () => {
    describe('TestPager Management Update Component', () => {
        let comp: TestPagerUpdateComponent;
        let fixture: ComponentFixture<TestPagerUpdateComponent>;
        let service: TestPagerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestPagerUpdateComponent]
            })
                .overrideTemplate(TestPagerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestPagerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestPagerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestPager(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testPager = entity;
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
                    const entity = new TestPager();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testPager = entity;
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
