/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyToManyMySuffixUpdateComponent } from 'app/entities/test-many-to-many-my-suffix/test-many-to-many-my-suffix-update.component';
import { TestManyToManyMySuffixService } from 'app/entities/test-many-to-many-my-suffix/test-many-to-many-my-suffix.service';
import { TestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';

describe('Component Tests', () => {
    describe('TestManyToManyMySuffix Management Update Component', () => {
        let comp: TestManyToManyMySuffixUpdateComponent;
        let fixture: ComponentFixture<TestManyToManyMySuffixUpdateComponent>;
        let service: TestManyToManyMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyToManyMySuffixUpdateComponent]
            })
                .overrideTemplate(TestManyToManyMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestManyToManyMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestManyToManyMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestManyToManyMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testManyToMany = entity;
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
                    const entity = new TestManyToManyMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testManyToMany = entity;
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
