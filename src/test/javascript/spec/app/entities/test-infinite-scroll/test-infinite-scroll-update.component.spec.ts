/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestInfiniteScrollUpdateComponent } from 'app/entities/test-infinite-scroll/test-infinite-scroll-update.component';
import { TestInfiniteScrollService } from 'app/entities/test-infinite-scroll/test-infinite-scroll.service';
import { TestInfiniteScroll } from 'app/shared/model/test-infinite-scroll.model';

describe('Component Tests', () => {
    describe('TestInfiniteScroll Management Update Component', () => {
        let comp: TestInfiniteScrollUpdateComponent;
        let fixture: ComponentFixture<TestInfiniteScrollUpdateComponent>;
        let service: TestInfiniteScrollService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestInfiniteScrollUpdateComponent]
            })
                .overrideTemplate(TestInfiniteScrollUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestInfiniteScrollUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestInfiniteScrollService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestInfiniteScroll(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testInfiniteScroll = entity;
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
                    const entity = new TestInfiniteScroll();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testInfiniteScroll = entity;
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
