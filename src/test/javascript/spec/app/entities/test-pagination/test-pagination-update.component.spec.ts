/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestPaginationUpdateComponent } from 'app/entities/test-pagination/test-pagination-update.component';
import { TestPaginationService } from 'app/entities/test-pagination/test-pagination.service';
import { TestPagination } from 'app/shared/model/test-pagination.model';

describe('Component Tests', () => {
    describe('TestPagination Management Update Component', () => {
        let comp: TestPaginationUpdateComponent;
        let fixture: ComponentFixture<TestPaginationUpdateComponent>;
        let service: TestPaginationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestPaginationUpdateComponent]
            })
                .overrideTemplate(TestPaginationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestPaginationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestPaginationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestPagination(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testPagination = entity;
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
                    const entity = new TestPagination();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testPagination = entity;
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
