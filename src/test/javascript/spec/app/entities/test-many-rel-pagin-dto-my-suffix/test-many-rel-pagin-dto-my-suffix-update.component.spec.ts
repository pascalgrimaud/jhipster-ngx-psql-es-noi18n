/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyRelPaginDTOMySuffixUpdateComponent } from 'app/entities/test-many-rel-pagin-dto-my-suffix/test-many-rel-pagin-dto-my-suffix-update.component';
import { TestManyRelPaginDTOMySuffixService } from 'app/entities/test-many-rel-pagin-dto-my-suffix/test-many-rel-pagin-dto-my-suffix.service';
import { TestManyRelPaginDTOMySuffix } from 'app/shared/model/test-many-rel-pagin-dto-my-suffix.model';

describe('Component Tests', () => {
    describe('TestManyRelPaginDTOMySuffix Management Update Component', () => {
        let comp: TestManyRelPaginDTOMySuffixUpdateComponent;
        let fixture: ComponentFixture<TestManyRelPaginDTOMySuffixUpdateComponent>;
        let service: TestManyRelPaginDTOMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyRelPaginDTOMySuffixUpdateComponent]
            })
                .overrideTemplate(TestManyRelPaginDTOMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestManyRelPaginDTOMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestManyRelPaginDTOMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestManyRelPaginDTOMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testManyRelPaginDTO = entity;
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
                    const entity = new TestManyRelPaginDTOMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testManyRelPaginDTO = entity;
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
