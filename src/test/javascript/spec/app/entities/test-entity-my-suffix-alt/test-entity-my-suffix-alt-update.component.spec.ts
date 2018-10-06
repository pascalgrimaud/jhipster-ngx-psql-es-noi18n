/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestEntityMySuffixAltUpdateComponent } from 'app/entities/test-entity-my-suffix-alt/test-entity-my-suffix-alt-update.component';
import { TestEntityMySuffixAltService } from 'app/entities/test-entity-my-suffix-alt/test-entity-my-suffix-alt.service';
import { TestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';

describe('Component Tests', () => {
    describe('TestEntityMySuffixAlt Management Update Component', () => {
        let comp: TestEntityMySuffixAltUpdateComponent;
        let fixture: ComponentFixture<TestEntityMySuffixAltUpdateComponent>;
        let service: TestEntityMySuffixAltService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestEntityMySuffixAltUpdateComponent]
            })
                .overrideTemplate(TestEntityMySuffixAltUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestEntityMySuffixAltUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestEntityMySuffixAltService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestEntityMySuffixAlt(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testEntity = entity;
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
                    const entity = new TestEntityMySuffixAlt();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testEntity = entity;
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
