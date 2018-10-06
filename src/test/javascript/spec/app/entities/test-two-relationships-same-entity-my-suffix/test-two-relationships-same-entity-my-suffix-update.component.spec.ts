/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestTwoRelationshipsSameEntityMySuffixUpdateComponent } from 'app/entities/test-two-relationships-same-entity-my-suffix/test-two-relationships-same-entity-my-suffix-update.component';
import { TestTwoRelationshipsSameEntityMySuffixService } from 'app/entities/test-two-relationships-same-entity-my-suffix/test-two-relationships-same-entity-my-suffix.service';
import { TestTwoRelationshipsSameEntityMySuffix } from 'app/shared/model/test-two-relationships-same-entity-my-suffix.model';

describe('Component Tests', () => {
    describe('TestTwoRelationshipsSameEntityMySuffix Management Update Component', () => {
        let comp: TestTwoRelationshipsSameEntityMySuffixUpdateComponent;
        let fixture: ComponentFixture<TestTwoRelationshipsSameEntityMySuffixUpdateComponent>;
        let service: TestTwoRelationshipsSameEntityMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestTwoRelationshipsSameEntityMySuffixUpdateComponent]
            })
                .overrideTemplate(TestTwoRelationshipsSameEntityMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestTwoRelationshipsSameEntityMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestTwoRelationshipsSameEntityMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestTwoRelationshipsSameEntityMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testTwoRelationshipsSameEntity = entity;
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
                    const entity = new TestTwoRelationshipsSameEntityMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testTwoRelationshipsSameEntity = entity;
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
